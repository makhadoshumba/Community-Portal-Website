use Webdev

ALTER TABLE admin_users
ADD role VARCHAR(20) NOT NULL
CONSTRAINT DF_admin_users_role DEFAULT 'admin';

SELECT * FROM admin_users;

INSERT INTO admin_users (username, password, role)
VALUES ('Shumba', '6153', 'superadmin');

SELECT username, role
FROM admin_users
WHERE username = 'Shumba';