from abc import ABC, abstractmethod

class BaseScraper(ABC):
    @abstractmethod
    async def search(self, query: str):
        pass
