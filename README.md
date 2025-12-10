# SwipeHire

Overview

SwipeHire is a web application that helps college students efficiently find job and internship opportunities tailored to their skills, experiences, and interests. The system allows users to create a short profile, upload their Resume, swipe through job postings drawn from a sample dataset, and automatically rank right-swiped (“liked”) jobs by how well they match the user’s resume information. The app’s main goal is to make the job search process quicker and more engaging for students while providing university career departments with a modern, data-driven tool to support student employability.

Business Need / Why:

College students often struggle to navigate complex job boards or identify roles aligned with their backgrounds. Traditional job portals are time-consuming and lack personalization for early-career candidates. SwipeHire streamlines the discovery process by letting users indicate quick preferences and view clear ‘match percentages’ with no additional cost, improving student engagement and helping universities or career centers integrate smarter matching tools.

How to Run the program:

- To run the app, clone the repo to you local device then run the following commands:
- cd into the SwipeHire/frontend folder
- Run: npm install 
- Run: npm run dev 

# Backend Setup (Django REST API)

SwipeHire includes a lightweight backend built with **Django** and **Django REST Framework**.  
The backend stores job postings, records swipe actions, and exposes simple API endpoints to support the frontend.

## 1. Install Dependencies

From the **repo root** (`SwipeHire-main`):

```bash
cd swipehire-backend
python3 -m venv venv
source venv/bin/activate     # macOS / Linux
# venv\Scripts\activate      # Windows

pip install -r ../requirements.txt
```

## 2. Run Database Migrations

```bash
python3 manage.py migrate
```

## 3. Seed Demo Job Data

```bash
python3 manage.py seed_jobs
```

## 4. Start the Backend Server

```bash
python3 manage.py runserver
```

The API will be available at:

```
http://127.0.0.1:8000/
```

---

## 📡 API Endpoints

| Endpoint                       | Method | Description                                |
|--------------------------------|--------|--------------------------------------------|
| `/api/jobs/deck/`              | GET    | Returns the list of job cards for swiping  |
| `/api/swipes/`                 | POST   | Records a left/right swipe action          |
| `/api/likes/?user=<email>`     | GET    | Returns all jobs a user has liked          |

---

## 🧪 Run Backend Tests

```bash
python3 manage.py test
```

This runs both unit tests (services layer) and integration tests (API endpoints).

---

# 🧩 Backend Architecture

```txt
swipehire-backend/
│
├── backend/                # Django project settings + URL routing
│
├── jobs/                   # “Jobs” domain module
│   ├── models.py           # Job model
│   ├── services.py         # Job business logic
│   ├── serializers.py      # JSON serialization
│   ├── views.py            # REST API endpoints
│   └── tests.py            # Unit tests
│
├── swipes/                 # “Swipes / Likes” domain module
│   ├── models.py
│   ├── services.py
│   ├── serializers.py
│   ├── views.py
│   └── tests.py
│
└── manage.py
```

This structure demonstrates:

- **Decomposition:** separate `jobs` and `swipes` apps  
- **Encapsulation:** business logic isolated in `services.py`  
- **Modularity:** models, views, serializers, and tests clearly separated  
- **Testability:** each module includes its own automated tests  
- **Deployability:** minimal setup (migrate + seed + runserver)

---

## 🧪 Notes on Testability

The backend includes automated tests that verify:

- Core job logic (`get_job_deck_for_user`)
- Swipe creation and behavior (`record_swipe`)
- API correctness for `/api/swipes/` and `/api/likes/`

Run them with:

```bash
python3 manage.py test
```
