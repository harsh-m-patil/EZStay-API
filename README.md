# EZStay API

## Routes

### /api/v1/hotels/

| METHOD     | Param | Description        |
| ---------- | ----- | ------------------ |
| **GET**    | none  | Get all hotels     |
| **POST**   | none  | Create a hotel     |
| **GET**    | id    | Get hotel by id    |
| **PATCH**  | id    | Update hotel by id |
| **DELETE** | id    | DELETE a hotel     |

#### Usage

> [!NOTE]
> curl commands are used to demonstrate the API usage.
> jq is used to format the output of curl commands.
> You can use any other tool like Postman or Insomnia to make the requests.

- For Postman or Insomnia, use the following URL for the API: `localhost:3000/api/v1/hotels/`
- and use the method as mentioned ahead of -X in curl commands.
- and add the required fields in the body of the request.

- Get all hotels

```bash
curl -sS 'localhost:3000/api/v1/hotels' | jq
```

- Get a hotel by ID

```bash
# replace example id with the id of hotel you want to get
curl -sS 'localhost:3000/api/v1/hotels/668bdc727c822830900c7827' | jq
```

- Create a new Hotel

```bash
# add all required fields in order to create a hotel
# more field exists but are ommitted for consizeness of query
curl -H "Content-Type: application/json" -d '{ "name" : "test", "ratingsAverage" : 3.2 }'
-sS -X POST 'localhost:3000/api/v1/hotels' | jq
```

- Update a hotel by ID

```bash
# replace id with the hotel you want to update
curl -H "Content-Type: application/json" -d '{ json body fill data here }' \
-sS -X PATCH 'localhost:3000/api/v1/hotels/668bdc727c822830900c7827' | jq
```

- Delete a hotel by ID

```bash
# replace example id with the id of hotel you want to delete
curl -sS -X DELETE 'localhost:3000/api/v1/hotels/668bdc727c822830900c7827' | jq
```

- Search hotels by fields

| Available fields |
| ---------------- |
| `name`           |
| `ratingsAverage` |
| `numOfReviews`   |
| `createdAt`      |

```bash
# can use other fields instead of ratingsAverage
# add more fields to url by separating with &
curl -sS 'localhost:3000/api/v1/hotels?ratingsAverage=3.2' | jq
```

- Equality operators

```bash
# can use gt,gte,lt,lte
curl -sS 'localhost:3000/api/v1/hotels?ratingsAverage[gte]=3.2' | jq
```

- Sort hotels by fields

| Available fields |
| ---------------- |
| `ratingsAverage` |
| `numOfReviews`   |
| `createdAt`      |

```bash
# can use other fields instead of ratingsAverga
curl -sS 'localhost:3000/api/v1/hotels?sort=ratingsAverage'  \
| jq
# use - for descending order
```
