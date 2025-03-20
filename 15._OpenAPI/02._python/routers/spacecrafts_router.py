from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class Spacecraft(BaseModel):
    id: int
    name: str


spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Enterprise"),
    Spacecraft(id=3, name="Kepler"),
]

@router.get('/api/spacecrafts', response_model=list[Spacecraft])
def get_spacecrafts():
    return spacecrafts

@router.get('/api/spacecrafts/{spacecraft_id}', response_model=Spacecraft)
def get_spacecraft_by_id(spacecraft_id: int):
    try:
        return next(filter(lambda x: x.id == spacecraft_id, spacecrafts))
    except StopIteration:
        raise HTTPException(status_code=404, detail="Spacecraft not found")
    
@router.post('/api/spacecrafts', response_model=Spacecraft)
def create_spacecraft(spacecraft: Spacecraft):
    spacecrafts.append(spacecraft)
    return spacecraft

@router.delete('/api/spacecrafts/{spacecraft_id}', response_model=Spacecraft)
def delete_spacecraft(spacecraft_id: int):
    try:
        spacecraft = next(filter(lambda x: x.id == spacecraft_id, spacecrafts))
        spacecrafts.remove(spacecraft)
        return spacecraft
    except StopIteration:
        raise HTTPException(status_code=404, detail="Spacecraft not found")