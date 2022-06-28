# Tasks (1 - 3)

Need to set the following env variables in `.env` file
```
PORT
HOST
HASH_SECRET
JWT_SECRET_KEY
```

## Installation
```bash
$npm i
```

## To run the server
```bash
$npm start
```

### **Endpoints:**
    `status_code` `400` will be accompanied with all routes where there is a need for data validation arises.
- `/user-details`
    - **GET**: Returns the array of user details, status code, `200`.
    - **POST**: Expects the payload with following keys
        ```
        {
            "username": string
            "password": string, (of min length 6 and amx length 16)
            "contactNumber": integer containing 10 digits
        }
        ```
        The password will be encrypted before storing it in the DB.
        returns a new row created with the Post data. status code , `201`
    - **DELETE**: payload in the request body
        ```
        {
            "userIds": [10, 11]
        }
        ```
        return a json of the form
        ```
        {
            "raw": [],
            "affected": 1
        }
        ```
        Where the `affected` key tells the number of rows deleted. status code, `200`
- `/login`
    - **POST**:
        payload:
            ```
            {
                "username": "****",
                "password": "******"
            }
            ```
        Possible responses:
        - status code `200`: successful login, jwt token will be sent in the response.
            ```
            {"token": <token>}
            ```
        - status code `401`:
            ```
            {
                "message": "Invalid credentials"
            }
            ```
        - status code `400`: Bad request 


### Task - 4 (SQL Command)
```repl
>> SELECT Customer_Id, Cust_Name, Customer.City, Grade from Customer LEFT JOIN Salesman ON Customer.Salesman_Id = Salesman.Salesman_Id WHERE Salesman.Commission > 0.12;
```

