// It was made by AI, please forgive me, I didn't know how to deploy to gitlab pages, and it's the only way to go

import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Перемещение файлов из public/static в public
const staticDir = join(__dirname, 'public', 'static');
const publicDir = join(__dirname, 'public');

fs.pathExists(staticDir, (err, exists) => {
    if (err) {
        console.error('Ошибка при проверке существования директории:', err);
        return;
    }

    if (exists) {
        fs.copy(staticDir, publicDir, { overwrite: true }, err => {
            if (err) {
                console.error('Ошибка при копировании файлов:', err);
            } else {
                console.log('Файлы успешно скопированы');
                fs.remove(staticDir, err => {
                    if (err) console.error('Ошибка при удалении папки:', err);
                    else console.log('Папка успешно удалена');
                });
            }
        });
    } else {
        console.log(`Директория ${staticDir} не существует, пропускаем копирование.`);
    }
});
