# RapidXcel Logistics Backend

This is the backend service for the RapidXcel Logistics application, built using Flask.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ritwickrajmakhal/RapidXcel-Logistics.git
   cd RapidXcel-Logistics/backend
   ```

2. Create a virtual environment:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Initialize the database:
   ```bash
   flask --app rapidxcel_logistics:create_app db init
   flask --app rapidxcel_logistics:create_app db migrate -m "Initial migration."
   flask --app rapidxcel_logistics:create_app db upgrade
   ```

5. Creating a .env File

To configure environment variables, create a `.env` file in the `backend` directory with the following content:

```
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@example.com
MAIL_PASSWORD=your_email_password
MAIL_USE_TLS=True
MAIL_USE_SSL=False
PASSWORD_RESET_URL=http://localhost:3000/reset-password
```
## Usage

1. Run the development server:

   ```bash
   flask --app rapidxcel_logistics run --debug
   ```

2. The server will start on `http://127.0.0.1:5000/`.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
