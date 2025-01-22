# Auto CRM

An AI-powered CRM system built with modern technologies for efficient customer relationship management.

## Tech Stack

### Frontend
- Vite + React + TypeScript
- Tailwind CSS for styling
- Shadcn UI + Radix UI for components
- Zustand for state management

### Backend
- FastAPI (Python)
- Supabase for database and authentication
- Python 3.9+

## Project Structure

```
auto-crm/
├── src/
│   ├── frontend/        # React + Vite frontend
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── hooks/      # Custom hooks and stores
│   │   └── styles/     # Global styles and themes
│   └── backend/        # FastAPI backend
│       ├── api/        # API routes
│       ├── services/   # Business logic
│       └── models/     # Data models and schemas
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- npm or yarn
- pip (Python package manager)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd src/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd src/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

### Environment Variables

Create a `.env` file in both frontend and backend directories with the following variables:

```env
# Frontend (.env)
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend (.env)
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## Development

- Frontend development server runs on `http://localhost:5173`
- Backend API server runs on `http://localhost:8000`
- API documentation available at `http://localhost:8000/docs`

## Features

- Modern, responsive UI with dark mode support
- Real-time data synchronization
- AI-powered customer insights
- Secure authentication via Supabase
- RESTful API with FastAPI
- Comprehensive documentation

## Contributing

Please read our contribution guidelines and code of conduct before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.