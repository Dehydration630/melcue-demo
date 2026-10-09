"""Check the public artifact only; never reads production files or credentials."""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
allowed={'.md','.html','.css','.mjs','.svg','.py'}
errors=[]; count=0
for f in root.rglob('*'):
    if not f.is_file() or '.git' in f.parts or '__pycache__' in f.parts: continue
    count+=1
    if f.suffix not in allowed and f.name not in {'LICENSE','.gitignore','.nojekyll'}: errors.append(f'Unexpected public file: {f.relative_to(root)}')
    text=f.read_text(encoding='utf-8')
    if f.name!='check_publication.py':
        for pattern in [r'/Users/',r'-----BEGIN .*PRIVATE KEY',r'gh[pousr]_[A-Za-z0-9]{20,}',r'AKLT[A-Za-z0-9]{16,}',r'sk-[A-Za-z0-9]{20,}']:
            if re.search(pattern,text): errors.append(f'Private pattern: {f.relative_to(root)}')
    if f.suffix=='.md':
        for target in re.findall(r'\]\(([^)#]+)(?:#[^)]*)?\)',text):
            if not re.match(r'https?://|mailto:',target) and not (f.parent/target).exists(): errors.append(f'Missing link: {f.name}: {target}')
assert not errors,'\n'.join(errors)
print(f'Publication checks passed: {count} text/vector files; no media or configuration included.')
