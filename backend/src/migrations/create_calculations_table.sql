CREATE TABLE IF NOT EXISTS calculations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    carbonFootprint DECIMAL(10,2) NOT NULL,
    date DATETIME NOT NULL,
    activities JSON NOT NULL,
    INDEX idx_username (username),
    INDEX idx_date (date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 