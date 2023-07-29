-- CreateTable
CREATE TABLE `Customers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rut` VARCHAR(10) NOT NULL,
    `name` VARCHAR(20) NULL,
    `lastname` VARCHAR(20) NULL,
    `address` VARCHAR(100) NULL,
    `cellphone` VARCHAR(10) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    UNIQUE INDEX `Customers_rut_key`(`rut`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sellers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rut` VARCHAR(10) NOT NULL,
    `name` VARCHAR(20) NULL,
    `lastname` VARCHAR(20) NULL,
    `address` VARCHAR(100) NULL,
    `cellphone` VARCHAR(10) NULL,
    `birthday` DATETIME(3) NOT NULL,
    `email` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    UNIQUE INDEX `Sellers_rut_key`(`rut`),
    UNIQUE INDEX `Sellers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `seller_id` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rut` VARCHAR(10) NOT NULL,
    `name` VARCHAR(20) NULL,
    `address` VARCHAR(100) NULL,
    `cellphone` VARCHAR(10) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    UNIQUE INDEX `Providers_rut_key`(`rut`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BranchOffices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `branch_office_id` INTEGER NOT NULL,
    `provider_id` INTEGER NOT NULL,
    `categories_id` INTEGER NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT NOW(),
    `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sale_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `sub_total` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sales` ADD CONSTRAINT `Sales_seller_id_fkey` FOREIGN KEY (`seller_id`) REFERENCES `Sellers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_branch_office_id_fkey` FOREIGN KEY (`branch_office_id`) REFERENCES `BranchOffices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `Providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetails` ADD CONSTRAINT `SaleDetails_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `Sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleDetails` ADD CONSTRAINT `SaleDetails_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
