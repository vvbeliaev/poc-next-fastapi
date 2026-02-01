from pydantic import BaseModel


class AnalyzeResponse(BaseModel):
    filename: str
    file_size: int
    content_type: str
    analysis: dict
