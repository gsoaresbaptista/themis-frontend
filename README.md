```bash
docker build -t themis-front:latest -f docker/Dockerfile .
docker run -p 3000:80 -it themis-front:latest
```