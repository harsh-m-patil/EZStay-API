const fs = require("fs")
// eslint-disable-next-line node/no-unpublished-require, import/no-extraneous-dependencies
const { faker } = require("@faker-js/faker")

// Function to generate fake hotel data
const generateFakeHotel = () => ({
  name: faker.company.name(),
  location: {
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    pincode: faker.location.zipCode("######"), // Generate a 6-digit pincode
  },
  amenities: faker.helpers.arrayElements(
    ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant"],
    faker.number.int({ min: 1, max: 5 }),
  ),
  description: faker.lorem.paragraph(),
  images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
    faker.image.url(),
  ),
  ratingsAverage: faker.number.int({ min: 30, max: 50 }) / 10,
  numReviews: faker.number.int({ min: 0, max: 1000 }),
})

// Function to generate and save fake hotel data as JSON file
const generateAndSaveHotels = (numHotels, filename) => {
  const hotels = []
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numHotels; i++) {
    hotels.push(generateFakeHotel())
  }

  fs.writeFile(filename, JSON.stringify(hotels, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file", err)
    } else {
      console.log(`${numHotels} fake hotels saved to ${filename}`)
    }
  })
}

// Generate and save 10 fake hotels to hotels.json
generateAndSaveHotels(10, "hotels.json")
