import { readdir, copyFile, unlink, lstat, mkdir, rm } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Перемещение файлов из public/static в public
const staticDir = join(__dirname, 'public', 'static');
const publicDir = join(__dirname, 'public');

function copyRecursiveSync(src, dest) {
    lstat(src, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.log(`Directory ${src} does not exist, skipping.`);
                return;
            } else {
                throw err;
            }
        }

        if (stats.isDirectory()) {
            mkdir(dest, { recursive: true }, (err) => {
                if (err) throw err;

                readdir(src, (err, files) => {
                    if (err) throw err;

                    files.forEach(file => {
                        copyRecursiveSync(join(src, file), join(dest, file));
                    });
                });
            });
        } else {
            copyFile(src, dest, (err) => {
                if (err) throw err;

                unlink(src, (err) => {
                    if (err && err.code !== 'ENOENT') throw err;
                });
            });
        }
    });
}

copyRecursiveSync(staticDir, publicDir);

// Удаление пустой папки static
rm(staticDir, { recursive: true, force: true }, (err) => {
    if (err) throw err;
});
