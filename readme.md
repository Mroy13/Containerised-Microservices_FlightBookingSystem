
---

# Flight Booking System

This Flight Booking System is designed as a microservices architecture using Docker containers. It comprises four microservices, along with supporting containers for RabbitMQ (message queue) and MySQL (database). Docker Compose orchestrates these services for seamless deployment.

## Microservices  

1. **[API Gateway](https://github.com/Mroy13/API_Gateway_fightBooking):** Handles external requests, routing them to appropriate microservices and manages authentication and authorization.  
2. **[Flight Service](https://github.com/Mroy13/FB_Service1_FlightService):** Manages flight-related information, such as airplanes, airports, and flights.  
3. **[Booking Service](https://github.com/Mroy13/Service2_Flight-booking-service):** Handles flight bookings, payments, and messages after successful booking.  
4. **[Notification Service](https://github.com/Mroy13/Notification_service_flightBooking):** Manages notifications and communications related to bookings, updates, and reminders.  

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
2. [FLIGHT_SERVICE_FLIGHTBOOKING_SYESTEM](https://documenter.getpostman.com/view/28392756/2sAXjKasMW)
3. [BOOKING_SERVICE_FLIGHTBOOKING_SYSTEM](https://documenter.getpostman.com/view/28392756/2sAXjNXAjj)
4. [NOTIFICATION_SERVICE_FLIGHTBOOKING_SYSTEM](https://documenter.getpostman.com/view/28392756/2sAXjNXAy4)




---

# Setting Up Sequelize Configuration in Microservices

Follow these steps to configure Sequelize for your microservices.

---

## Step 1: Initialize Sequelize Configuration

For each microservice, navigate to the `src` directory and execute the following command:

```bash
cd path/to/microservice/src
npx sequelize init:config
```

Repeat this step for every microservice in your project.

---

## Step 2: Update MySQL Configuration

Open the generated Sequelize configuration file (`src/config/config.json`) inside each microservice and update the database connection details as required.

Here’s an example configuration snippet:

```json
{
  "development": {
    "username": "root",
    "password": "enter_password",
    "database": "your_database_name",
    "host": "db-service",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "enter_password",
    "database": "test_database",
    "host": "db-service",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "enter_password",
    "database": "production_database",
    "host": "db-service",
    "dialect": "mysql"
  }
}
```

---

### Database Configuration Fields

- **`username`**: Your database username (e.g., `"root"`).
- **`password`**: The password used during the database service setup using Docker Compose.
- **`database`**: The name of your database (e.g., `"your_database_name"`).
- **`host`**: The address of your database server (default is `"db-service"`, change this if you rename the service).
- **`dialect`**: The database type (set this to `"mysql"` for MySQL).

---



- To initiate the microservices server and construct the necessary images and containers, execute the following command after setting up Docker:

- Inside root directory execute:
  
   ```
    docker compose up -d
  ```
##
- Please ensure Docker is set up on your system before running the above command. This command orchestrates the creation of containers hosting the microservices.



