export function toProduct (product) {
    return {
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        thumbnail: product.thumbNailUrl
    };
}

export function toProductVariations (product) {
    return product.variations.flatMap(vary =>
        vary.imagesUrl.map(img =>
        ({
            variantId: vary.variantId,
            variationName: vary.variationName,
            sku: vary.sku,
            price: vary.price,
            color: vary.color,
            image: img
        })
        )
    );
}

export function toCategories (product) {
    return product.categories.map(cat => cat);
}