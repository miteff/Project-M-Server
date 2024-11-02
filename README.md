212.67.13.228 Имя пользователя: root Пароль: CN08qULJ&wSa

ssh root@212.67.13.228 CN08qULJ&wSa

sudo apt update sudo apt install postgresql postgresql-contrib sudo systemctl start postgresql.service sudo systemctl status postgresql.service sudo -i -u postgres psql

Для проверки SELECT 1;

создаем юзера CREATE USER mynewuser WITH PASSWORD 'mypassword';

ALTER USER mynewuser WITH SUPERUSER;

Создание базы create database tester;

\c tester;

Создаем тестовую табличку

CREATE TABLE students ( id SERIAL PRIMARY KEY, name VARCHAR(100), specialization VARCHAR(100) );

добавляем данные

INSERT INTO students (name, specialization) VALUES ('Иван', 'Математика'), ('Анна', 'Биология'), ('Петр', 'Информатика');

проверяем SELECT * FROM students;

Для выхода \q

выход на root exit

По умолчанию, PostgreSQL настроен на прослушивание только соединений с локального хоста. Если вы хотите разрешить подключения к базе данных с любого IP-адреса, вам потребуется внести изменения в два конфигурационных файла: postgresql.conf и pg_hba.conf.

postgresql.conf

sudo nano /etc/postgresql/{Версия PostgreSQL}/main/postgresql.conf Найдите строку, которая начинается с #listen_addresses = 'localhost'. Уберите символ # в начале строки, чтобы отменить комментирование, и замените localhost на *:

listen_addresses = '*'

Сохраните и закройте файл.

pg_hba.conf

Затем вам нужно обновить файл pg_hba.conf, чтобы разрешить входящие соединения с любого IP-адреса. Файл pg_hba.conf также находится в каталоге /etc/postgresql/{Версия PostgreSQL}/main/.

sudo nano /etc/postgresql/{Версия PostgreSQL}/main/pg_hba.conf

Добавьте в конец файла следующую строку:

host all all 0.0.0.0/0 md5

Это позволит любому IP-адресу подключаться к любой базе данных и пользователям, используя MD5-шифрование для пароля.

Сохраните и закройте файл.

Перезагрузка PostgreSQL

sudo systemctl restart postgresql

УДАЛЕНИЕ PSQL

Если вы хотите полностью удалить PostgreSQL вместе со всеми его файлами и данными, вы можете выполнить следующие команды:

Удалите пакеты PostgreSQL:

sudo apt-get --purge remove postgresql*

Эта команда удалит все пакеты, связанные с PostgreSQL. Флаг --purge гарантирует, что конфигурационные файлы также будут удалены.

Удалите оставшиеся каталоги:

sudo rm -r /etc/postgresql/ sudo rm -r /etc/postgresql-common/ sudo rm -r /var/lib/postgresql/

Эти команды удалят каталоги, которые обычно содержат данные и конфигурации PostgreSQL.

Удалите пользователя и группу PostgreSQL:

sudo deluser postgres sudo delgroup postgres

Эти команды удалят пользователя и группу PostgreSQL, которые обычно создаются при установке.

Пожалуйста, будьте осторожны при выполнении этих команд, особенно при удалении каталогов и пользователей. Убедитесь, что вы не удаляете что-то важное для вашей системы.


https://www.youtube.com/watch?v=QoLqMDSBZAs


PORT=4000







JWT_SECRET=your_secre123456t_key
NODE_ENV=development
DB_USER=tester
DB_HOST=212.67.13.228
DB_DATABASE=projectdb
DB_PASSWORD=123456
DB_PORT=5432




MONGO_URL=mongodb://mongoadmin:123456@45.12.236.151:27017/projectm?authSource=admin
DB_NAME=projectm




SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tiras90@gmail.com
SMTP_PASSWORD=iovu esis zckv qffi

API_URL=http://localhost:4000
CLIENT_URL=http://localhost:3000