from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud
from app.database import get_db
from app.schemas import TaskCreate, TaskRead, TaskUpdate


router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task_data)


@router.get("", response_model=list[TaskRead])
def get_tasks(db: Session = Depends(get_db)):
    return crud.get_tasks(db)


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.patch("/{task_id}", response_model=TaskRead)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    task = crud.update_task(db, task_id, task_data)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    was_deleted = crud.delete_task(db, task_id)

    if not was_deleted:
        raise HTTPException(status_code=404, detail="Task not found")

    return None
