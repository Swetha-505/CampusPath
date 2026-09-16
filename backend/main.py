from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

import models
from database import engine, get_db


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

models.Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="CampusPath API",
    description="Backend API for the CampusPath student platform",
    version="1.0.0"
)


# =========================================================
# CORS CONFIGURATION
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# PYDANTIC SCHEMAS
# =========================================================


# -------------------------
# Profile Schema
# -------------------------

class ProfileCreate(BaseModel):
    name: str
    role: str
    college: str
    year: str
    email: str
    goal: str


# -------------------------
# Discussion Schema
# -------------------------

class DiscussionCreate(BaseModel):
    title: str
    description: str
    category: str
    anonymous: bool = False


# -------------------------
# Answer Schema
# -------------------------

class AnswerCreate(BaseModel):
    answer: str
    anonymous: bool = False


class ResourceCreate(BaseModel):
    title: str
    description: str
    category: str
    resource_type: str
    link: str
    difficulty: str

class ExamCreate(BaseModel):
    title: str
    subject: str
    exam_type: str
    date: str
    duration: str
    description: str


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to CampusPath API",
        "status": "Backend is running"
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CampusPath backend"
    }


# =========================================================
# PROFILE APIs
# =========================================================


# -------------------------
# GET PROFILE
# -------------------------

@app.get("/api/profile")
def get_profile(
    db: Session = Depends(get_db)
):

    profile = db.query(
        models.StudentProfile
    ).first()

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return {
        "id": profile.id,
        "name": profile.name,
        "role": profile.role,
        "college": profile.college,
        "year": profile.year,
        "email": profile.email,
        "goal": profile.goal
    }


# -------------------------
# CREATE PROFILE
# -------------------------

@app.post("/api/profile")
def create_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db)
):

    existing_profile = db.query(
        models.StudentProfile
    ).first()

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )

    new_profile = models.StudentProfile(
        name=profile.name,
        role=profile.role,
        college=profile.college,
        year=profile.year,
        email=profile.email,
        goal=profile.goal
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile created successfully",
        "profile": {
            "id": new_profile.id,
            "name": new_profile.name,
            "role": new_profile.role,
            "college": new_profile.college,
            "year": new_profile.year,
            "email": new_profile.email,
            "goal": new_profile.goal
        }
    }


# -------------------------
# UPDATE PROFILE
# -------------------------

@app.put("/api/profile")
def update_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db)
):

    existing_profile = db.query(
        models.StudentProfile
    ).first()

    if existing_profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    existing_profile.name = profile.name
    existing_profile.role = profile.role
    existing_profile.college = profile.college
    existing_profile.year = profile.year
    existing_profile.email = profile.email
    existing_profile.goal = profile.goal

    db.commit()
    db.refresh(existing_profile)

    return {
        "message": "Profile updated successfully",
        "profile": {
            "id": existing_profile.id,
            "name": existing_profile.name,
            "role": existing_profile.role,
            "college": existing_profile.college,
            "year": existing_profile.year,
            "email": existing_profile.email,
            "goal": existing_profile.goal
        }
    }


# =========================================================
# DISCUSSION APIs
# =========================================================


# -------------------------
# GET ALL DISCUSSIONS
# -------------------------

@app.get("/api/discussions")
def get_discussions(
    db: Session = Depends(get_db)
):

    discussions = (
        db.query(models.Discussion)
        .order_by(models.Discussion.id.desc())
        .all()
    )

    return {
        "count": len(discussions),

        "discussions": [
            {
                "id": discussion.id,
                "title": discussion.title,
                "description": discussion.description,
                "category": discussion.category,
                "anonymous": discussion.anonymous,

                "author": (
                    "Anonymous"
                    if discussion.anonymous
                    else discussion.author
                )
            }

            for discussion in discussions
        ]
    }


# -------------------------
# CREATE DISCUSSION
# -------------------------

@app.post("/api/discussions")
def create_discussion(
    discussion: DiscussionCreate,
    db: Session = Depends(get_db)
):

    new_discussion = models.Discussion(
        title=discussion.title,
        description=discussion.description,
        category=discussion.category,
        anonymous=discussion.anonymous,
        author="Student"
    )

    db.add(new_discussion)
    db.commit()
    db.refresh(new_discussion)

    return {
        "message": "Discussion created successfully",

        "discussion": {
            "id": new_discussion.id,
            "title": new_discussion.title,
            "description": new_discussion.description,
            "category": new_discussion.category,
            "anonymous": new_discussion.anonymous,

            "author": (
                "Anonymous"
                if new_discussion.anonymous
                else new_discussion.author
            )
        }
    }


# =========================================================
# DISCUSSION ANSWER APIs
# =========================================================


# -------------------------
# GET ANSWERS
# -------------------------

@app.get("/api/discussions/{discussion_id}/answers")
def get_answers(
    discussion_id: int,
    db: Session = Depends(get_db)
):

    # Check whether discussion exists
    discussion = db.query(
        models.Discussion
    ).filter(
        models.Discussion.id == discussion_id
    ).first()

    if discussion is None:
        raise HTTPException(
            status_code=404,
            detail="Discussion not found"
        )

    # Get answers for this discussion
    answers = (
        db.query(models.DiscussionAnswer)
        .filter(
            models.DiscussionAnswer.discussion_id
            == discussion_id
        )
        .order_by(
            models.DiscussionAnswer.id.asc()
        )
        .all()
    )

    return {
        "count": len(answers),

        "answers": [
            {
                "id": answer.id,
                "discussion_id": answer.discussion_id,
                "answer": answer.answer,
                "anonymous": answer.anonymous,

                "author": (
                    "Anonymous"
                    if answer.anonymous
                    else answer.author
                )
            }

            for answer in answers
        ]
    }


# -------------------------
# CREATE ANSWER
# -------------------------

@app.post("/api/discussions/{discussion_id}/answers")
def create_answer(
    discussion_id: int,
    answer: AnswerCreate,
    db: Session = Depends(get_db)
):

    # Check whether discussion exists
    discussion = db.query(
        models.Discussion
    ).filter(
        models.Discussion.id == discussion_id
    ).first()

    if discussion is None:
        raise HTTPException(
            status_code=404,
            detail="Discussion not found"
        )

    # Check empty answer
    if not answer.answer.strip():
        raise HTTPException(
            status_code=400,
            detail="Answer cannot be empty"
        )

    # Create answer
    new_answer = models.DiscussionAnswer(
        discussion_id=discussion_id,
        answer=answer.answer.strip(),
        anonymous=answer.anonymous,
        author="Student"
    )

    db.add(new_answer)
    db.commit()
    db.refresh(new_answer)

    return {
        "message": "Answer added successfully",

        "answer": {
            "id": new_answer.id,
            "discussion_id": new_answer.discussion_id,
            "answer": new_answer.answer,
            "anonymous": new_answer.anonymous,

            "author": (
                "Anonymous"
                if new_answer.anonymous
                else new_answer.author
            )
        }
    }

# =========================================================
# RESOURCE APIs
# =========================================================

@app.get("/api/resources")
def get_resources(
    db: Session = Depends(get_db)
):
    resources = (
        db.query(models.Resource)
        .order_by(models.Resource.id.desc())
        .all()
    )

    return {
        "count": len(resources),
        "resources": [
            {
                "id": resource.id,
                "title": resource.title,
                "description": resource.description,
                "category": resource.category,
                "resource_type": resource.resource_type,
                "link": resource.link,
                "difficulty": resource.difficulty
            }
            for resource in resources
        ]
    }


@app.post("/api/resources")
def create_resource(
    resource: ResourceCreate,
    db: Session = Depends(get_db)
):
    if not resource.title.strip():
        raise HTTPException(
            status_code=400,
            detail="Resource title cannot be empty"
        )

    if not resource.description.strip():
        raise HTTPException(
            status_code=400,
            detail="Resource description cannot be empty"
        )

    if not resource.link.strip():
        raise HTTPException(
            status_code=400,
            detail="Resource link cannot be empty"
        )

    new_resource = models.Resource(
        title=resource.title.strip(),
        description=resource.description.strip(),
        category=resource.category.strip(),
        resource_type=resource.resource_type.strip(),
        link=resource.link.strip(),
        difficulty=resource.difficulty.strip()
    )

    db.add(new_resource)
    db.commit()
    db.refresh(new_resource)

    return {
        "message": "Resource created successfully",
        "resource": {
            "id": new_resource.id,
            "title": new_resource.title,
            "description": new_resource.description,
            "category": new_resource.category,
            "resource_type": new_resource.resource_type,
            "link": new_resource.link,
            "difficulty": new_resource.difficulty
        }
    }

# =========================================================
# UPDATE RESOURCE
# =========================================================

@app.put("/api/resources/{resource_id}")
def update_resource(
    resource_id: int,
    resource: ResourceCreate,
    db: Session = Depends(get_db)
):
    existing_resource = db.query(
        models.Resource
    ).filter(
        models.Resource.id == resource_id
    ).first()

    if existing_resource is None:
        raise HTTPException(
            status_code=404,
            detail="Resource not found"
        )

    if not resource.title.strip():
        raise HTTPException(
            status_code=400,
            detail="Resource title cannot be empty"
        )

    if not resource.description.strip():
        raise HTTPException(
            status_code=400,
            detail="Resource description cannot be empty"
        )

    if not resource.link.strip():
        raise HTTPException(
            status_code=400,
            detail="Resource link cannot be empty"
        )

    existing_resource.title = resource.title.strip()
    existing_resource.description = resource.description.strip()
    existing_resource.category = resource.category.strip()
    existing_resource.resource_type = resource.resource_type.strip()
    existing_resource.link = resource.link.strip()
    existing_resource.difficulty = resource.difficulty.strip()

    db.commit()
    db.refresh(existing_resource)

    return {
        "message": "Resource updated successfully",
        "resource": {
            "id": existing_resource.id,
            "title": existing_resource.title,
            "description": existing_resource.description,
            "category": existing_resource.category,
            "resource_type": existing_resource.resource_type,
            "link": existing_resource.link,
            "difficulty": existing_resource.difficulty
        }
    }


# =========================================================
# DELETE RESOURCE
# =========================================================

@app.delete("/api/resources/{resource_id}")
def delete_resource(
    resource_id: int,
    db: Session = Depends(get_db)
):
    resource = db.query(
        models.Resource
    ).filter(
        models.Resource.id == resource_id
    ).first()

    if resource is None:
        raise HTTPException(
            status_code=404,
            detail="Resource not found"
        )

    db.delete(resource)
    db.commit()

    return {
        "message": "Resource deleted successfully"
    }

# =========================================================
# EXAM APIs
# =========================================================

@app.get("/api/exams")
def get_exams(
    db: Session = Depends(get_db)
):
    exams = (
        db.query(models.Exam)
        .order_by(models.Exam.id.asc())
        .all()
    )

    return {
        "count": len(exams),
        "exams": [
            {
                "id": exam.id,
                "title": exam.title,
                "subject": exam.subject,
                "exam_type": exam.exam_type,
                "date": exam.date,
                "duration": exam.duration,
                "description": exam.description
            }
            for exam in exams
        ]
    }


@app.post("/api/exams")
def create_exam(
    exam: ExamCreate,
    db: Session = Depends(get_db)
):
    if not exam.title.strip():
        raise HTTPException(
            status_code=400,
            detail="Exam title cannot be empty"
        )

    if not exam.subject.strip():
        raise HTTPException(
            status_code=400,
            detail="Exam subject cannot be empty"
        )

    if not exam.date.strip():
        raise HTTPException(
            status_code=400,
            detail="Exam date cannot be empty"
        )

    new_exam = models.Exam(
        title=exam.title.strip(),
        subject=exam.subject.strip(),
        exam_type=exam.exam_type.strip(),
        date=exam.date.strip(),
        duration=exam.duration.strip(),
        description=exam.description.strip()
    )

    db.add(new_exam)
    db.commit()
    db.refresh(new_exam)

    return {
        "message": "Exam created successfully",
        "exam": {
            "id": new_exam.id,
            "title": new_exam.title,
            "subject": new_exam.subject,
            "exam_type": new_exam.exam_type,
            "date": new_exam.date,
            "duration": new_exam.duration,
            "description": new_exam.description
        }
    }