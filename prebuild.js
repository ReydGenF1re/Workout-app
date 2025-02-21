import { mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Создание папки public/static
const staticDir = join(__dirname, 'public', 'static');
if (!existsSync(staticDir)) {
    mkdirSync(staticDir, { recursive: true });
}
