import type { Connect, PluginOption, ViteDevServer } from 'vite';
import type http from 'http';
import sharp from 'sharp';
import { lookup } from 'mrmime';

const postfixRE = /[?#].*$/s;

export function cleanUrl(url: string): string {
	return url.replace(postfixRE, '');
}

/**
 * Middleware that emulates Netlify image resizing for the local development.
 */
export const netlifyEmulator = (): PluginOption => ({
	name: 'netlify-emulator',
	configureServer(server: ViteDevServer) {
		server.middlewares.use(
			(req: Connect.IncomingMessage, res: http.ServerResponse, next: Connect.NextFunction) => {
				if (typeof req.url === 'undefined') {
					next();
					return;
				}

				const url = new URL(req.url.replace(/^\/+/, '/'), 'http://example.com');
				const mode = url.searchParams.get('nf_resize');
				if (!mode) {
					next();
					return;
				}

				// Handle Netlify-style image resizing
				const pathname = decodeURI(url.pathname);
				const w = parseInt(url.searchParams.get('w') ?? '0', 10);
				const h = parseInt(url.searchParams.get('h') ?? '0', 10);
				const imagePath = pathname.replace(/^\/+/, '');
				const sendImage = (data: Buffer) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', lookup(pathname) ?? 'application/octet-stream');
					res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
					res.write(data);
					res.end();
				};
				sharp(imagePath)
					.resize({
						width: w,
						height: h,
						fit: mode === 'fit' ? 'inside' : 'cover'
					})
					.toBuffer()
					.then(sendImage);
			}
		);
	}
});
