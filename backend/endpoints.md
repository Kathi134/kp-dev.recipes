# Groceries
- GET
    - /groceries
    - /groceries/{name}
- POST
    - /groceries
        - name: str
- DELETE
    - /groceries/{name}


# Recipes
- GET
    - recipes
    - recipes/{name}
    - recipes/{id}
- POST
    - /recipes
        - name: str
        - duration: int
        - portions: int
        - description: [str]
        - components: [{str,  [{int, str, str}]}]
- PUT
    - /recipes/{id}
        - name: str
        - duration: int
        - portions: int
        - description: [str]
        - components: [{str,  [{int, str, str}]}]
- DELETE
    - /recpies/{id}


# Shopping List
- GET
    - /shopping-list
- PATCH
    - /shopping-list/items
        - recipeId: uuid
    - /shopping-list/items
        - quantity: int
        - unit: str
        - groceryName: str
- DELETE
    - /shopping-list/items/{id}
    - /shopping-list/items
        - where checked is true -> TODO: model update for check / no check