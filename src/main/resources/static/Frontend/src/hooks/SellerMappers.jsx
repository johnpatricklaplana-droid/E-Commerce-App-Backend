export function toSeller (seller) {
    return {
        firstName: seller.firstName,
        lastName: seller.lastName,
        profilePic: seller.profilePic,
        sellerId: seller.sellerId
    }
}

export function toSellerLocation (seller) {
    return seller.location.map(loc => 
    ({
        city: loc.city, 
        country: loc.country,
        lat: loc.lat,
        lon: loc.lon,
        postcode: loc.postcode,
        province: loc.province,
        street: loc.street
    })
    )
    
}