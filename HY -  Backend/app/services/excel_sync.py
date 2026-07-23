from pathlib import Path


def sync_excel_files(folder: str):
    path = Path(folder)
    if not path.exists():
        return []
    return [p.name for p in sorted(path.iterdir()) if p.is_file()]
