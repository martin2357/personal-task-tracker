import pytest
from pydantic import ValidationError

from app.schemas import TaskCreate, TaskUpdate


def test_task_create_accepts_valid_data():
    task = TaskCreate(
        title="Buy groceries",
        description="Milk, eggs, and bread",
        priority="high",
    )

    assert task.title == "Buy groceries"
    assert task.description == "Milk, eggs, and bread"
    assert task.priority == "high"


def test_task_create_uses_default_priority():
    task = TaskCreate(title="Read a book")

    assert task.priority == "medium"


def test_task_create_rejects_invalid_data():
    with pytest.raises(ValidationError):
        TaskCreate(title="", priority="urgent")


def test_task_update_supports_partial_updates():
    task_update = TaskUpdate(is_done=True)

    assert task_update.title is None
    assert task_update.description is None
    assert task_update.is_done is True
    assert task_update.priority is None
