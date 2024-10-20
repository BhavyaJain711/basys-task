# Patient Details Management System

This is a full-stack application for managing patient details, medical history, and prior authorization requests. The backend is built with **Node.js**, **Express**, and **MongoDB** using **Mongoose** for schema management, while the frontend uses **React**, **Material-UI (MUI)**, and **TailwindCSS** for a responsive and collapsible user interface.

## Features

- **Patient Information**: Display patient's basic information such as name, age, gender, and condition.
- **Medical History**: View and collapse individual medical history records.
- **Prior Authorization Requests**: View and collapse individual authorization requests.
- **Collapsible Sections**: Each category is collapsible, allowing for a cleaner, more organized UI.
  
## Tech Stack

### Backend
- **Node.js**
- **Express**
- **MongoDB** (Mongoose ODM)

### Frontend
- **React.js**
- **Material-UI (MUI)**
- **TailwindCSS**

## Installation and Setup

Follow the steps below to set up the project locally.

### Prerequisites

Ensure that you have the following installed:
- **Node.js** (v14+)
- **MongoDB** (running locally or using a cloud provider like MongoDB Atlas)

### Steps to Run the Project

1. **Clone the repository**

   ```bash
   git clone https://github.com/BhavyaJain711/basys-task
   cd basys-task
   ```

2. **Backend Setup**

   1. Navigate to the backend directory:
   
      ```bash
      cd backend
      ```

   2. Install the dependencies:

      ```bash
      npm install
      ```

   3. Set up environment variables:
   
      Create a `.env` file in the `backend` directory and add the following variables:

      ```
      MONGODB_URI=mongodb://localhost:27017/yourdatabase
      PORT=5000
      ```

   4. Start the backend server:

      ```bash
      npm start
      ```

3. **Frontend Setup**

   1. Navigate to the frontend directory:
   
      ```bash
      cd ../frontend
      ```

   2. Install the dependencies:

      ```bash
      npm install
      ```

   3. Start the frontend development server:

      ```bash
      npm run dev
      ```

4. **Access the Application**

   Once both the backend and frontend servers are running, you can access the application at `http://localhost:5173`.

### User Roles
- **user**: Can view their own details, medical history, and prior authorization requests.
- **doctor**: Can view patient details, medical history, and prior authorization requests for all patients.

## API Endpoints

### Patients API

- **GET /api/patients/:userId**
  - Fetch patient details by `userId`, including medical history and prior authorization requests.


### Example Response

```json
{
  "_id": "671118e41b42b75c0afc8951",
  "userId": "671118e41b42b75c0afc894f",
  "name": "Bhavya Jain",
  "gender": "male",
  "age": 21,
  "condition": "None",
  "medicalHistory": [
    {
      "_id": "671145c318c9d2be15efb200",
      "condition": "Cold",
      "treatment": "Rest",
      "medications": ["Dolo650"],
      "labResults": ["None"],
      "notes": "Rest 2 days",
      "date": "2024-10-17T17:13:39.021Z"
    }
  ],
  "priorAuthRequests": [
    {
      "_id": "671160d21480960b276a90a0",
      "treatment": "Cold",
      "insurancePlan": "AllCov",
      "dateOfService": "2024-10-17T00:00:00.000Z",
      "diagnosisCode": "COLD_101",
      "doctorNotes": "Rest with paracetamol.",
      "status": "pending"
    }
  ]
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.