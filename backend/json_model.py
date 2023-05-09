
import json

class JSON_Model:
    
    def __init__(self, X, y) -> None:
        self.X = X
        self.y = y

    def toJSON(self):
        self.X = self.X.tolist()
        self.y = self.y.tolist()

        return json.dumps(self, default=lambda o: o.__dict__, 
        sort_keys=True, indent=4)

    