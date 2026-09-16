from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey
from database import Base


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    college = Column(String, nullable=False)
    year = Column(String, nullable=False)
    email = Column(String, nullable=False)
    goal = Column(String, nullable=False)


class Discussion(Base):
    __tablename__ = "discussions"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    anonymous = Column(Boolean, default=False)

    author = Column(String, default="Student")


class DiscussionAnswer(Base):
    __tablename__ = "discussion_answers"

    id = Column(Integer, primary_key=True, index=True)

    discussion_id = Column(
        Integer,
        ForeignKey("discussions.id"),
        nullable=False
    )

    answer = Column(Text, nullable=False)

    anonymous = Column(Boolean, default=False)

    author = Column(String, default="Student")

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    resource_type = Column(String, nullable=False)
    link = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)

class Exam(Base):
    __tablename__ = "exams"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    exam_type = Column(String, nullable=False)
    date = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    description = Column(Text, nullable=False)