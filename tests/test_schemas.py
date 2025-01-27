import os
import json
from jsonschema import Draft7Validator
import pytest


def get_schema_files():
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return [os.path.join(path, f) for f in os.listdir(path) if f.endswith(".json")]


@pytest.mark.parametrize("schema_filename", get_schema_files())
def test_schemas(schema_filename):
    with open(schema_filename) as f:
        schema = json.load(f)
    Draft7Validator.check_schema(schema)
