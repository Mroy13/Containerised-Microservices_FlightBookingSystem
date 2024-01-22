
---

# Flight Booking System

This Flight Booking System is designed as a microservices architecture using Docker containers. It comprises four microservices, along with supporting containers for RabbitMQ (message queue) and MySQL (database). Docker Compose orchestrates these services for seamless deployment.

## Microservices

1. **API Gateway:** Handles external requests, routing them to appropriate microservices and manages authentication and authorization.
2. **Flight Service:** Manages flight-related information, such as airplanes, airport, flights.
3. **Booking Service:** Handles flight bookings, payment, and messages after successful booking.
4. **Notification Service:** Manages notifications and communications related to bookings, updates, and reminders.

## Dockerized Deployment

### Docker Compose Setup

The project utilizes Docker Compose for managing the multi-container setup. Key features include:

- **Port Mapping:** Each service's ports are mapped to facilitate external communication.
- **Custom Network:** A dedicated network ensures seamless communication between services while isolating them from external interference.
- **Service Health Checks:** Services are configured with health checks to ensure their availability.
- **Volumes and Bind Mounts:** Used for persisting data and sharing files between containers.

### Services Overview

- **API Gateway:** Exposed at port 3001, routes requests to appropriate services internally.
- **Flight Service:** Manages flights, available at port 3000.
- **Booking Service:** Handles bookings, available at port 4000.
- **Notification Service:** Manages notifications, available at port 3002.
- **RabbitMQ:** Handles message queueing for inter-service communication.
  
  ## port mappiing
      - "5672:5672"
      - "15672:15672"
- **MySQL:** Used as the database, accessible internally by the services.

    ## port mapping:
       - '3307:3306'

## API_ENDPOINTS and Documentaion(4_microservices)

1. [API_GATEWAY_FlightBooking_system](https://documenter.getpostman.com/view/28392756/2s9YsKhY7T)
2. [FLIGHT_SERVICE_FLIGHTBOOKING_SYESTEM]()
3. [BOOKING_SERVICE_FLIGHTBOOKING_SYSTEM]()
4. [NOTIFICATION_SERVICE_FLIGHTBOOKING_SYSTEM]()


## Setup and Configuration

 - Download or clone this project from github and open it in your favourite text editor. 
 
 - In the root directory create a `.env` file and add the following env variables
    ```
        USER='enter user name'
        PASSWORD='eneter password'
        ROOT_PASSWORD='enter rootPassword'
        
    ```
    ex: 
    ```
        USER='mroy13'
        PASSWORD='mr@123'
        ROOT_PASSWORD='mr@123'
        
    ```
 
 - Go inside api_gateway folder create a `.env` file and add the following env variables
 ```
    PORT=<port number of your choice>
    SALT_ROUND=<enter number of your choice>
    SECRET_KEY='<eneter any key>'
    FLIGHT_SERVICE='http://flight-service:3000'
    BOOKING_SERVICE='http://booking-service:4000'
    
 ```
 - Go inside Booking_service folder create a `.env` file and add the following env variables

 ```
    PORT=<port number of your choice>
    HOST_PORT=<flightService localhost url>
 ```
 
 - Go inside Flight_Service folder create a `.env` file and add the following env variables

 ```
       PORT=<port number of your choice>
 ```
 
 - Go inside Notification_Service folder create a `.env` file and add the following env variables

 ```
    PORT=<port number of your choice>
    MAIL_USERNAME='<enter user name>'
    MAIL_APP_PASSWORD='<enter app pwd>'
 ```

### Setting up Sequelize Configuration in Microservices

To configure Sequelize for your microservices, follow these steps:

### Step 1: Navigate to Microservice Folders

Navigate to each microservice folder and execute the following command:

```bash
cd path/to/microservice-folder
npx sequelize init:config
```

Repeat this step for every microservice in your project.

### Step 2: Update MySQL Configuration

Open the generated Sequelize configuration file (`config/config.json`) inside each microservice folder. Add the MySQL root user and password or the user and password used during MySQL service setup.

Example configuration snippet in `config/config.json`:

```json
{
  "development": {
    "username": "root",
    "password": "enter_password",
    "database": "your_database_name",
    "host": "localhost",
    "dialect": "mysql"
  },
  // ... other configurations
}
```

Replace `"enter_password"` with the actual password used during MySQL service setup.


- To initiate the microservices server and construct the necessary images and containers, execute the following command after setting up Docker:
  
   ```
    docker compose up -d
  ```
##
- Please ensure Docker is set up on your system before running the above command. This command orchestrates the creation of containers hosting the microservices.



