import { readdir, copyFile, unlink, rmdir } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Перемещение файлов из public/static в public
const staticDir = join(__dirname, 'public', 'static');
const publicDir = join(__dirname, 'public');

readdir(staticDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const oldPath = join(staticDir, file);
        const newPath = join(publicDir, file);

        copyFile(oldPath, newPath, (err) => {
            if (err) throw err;

            // Удаление файла после копирования
            unlink(oldPath, (err) => {
                if (err) throw err;
            });
        });
    });

    // Удаление пустой папки static
    rmdir(staticDir, { recursive: true }, (err) => {
        if (err) throw err;
    });
});
