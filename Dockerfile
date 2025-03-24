# 1. Next.js 애플리케이션을 위한 베이스 이미지
FROM node:20-alpine AS builder

# 2. 작업 디렉터리 설정
WORKDIR /app

# 3. 의존성 설치를 위한 package.json 및 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 소스 파일 복사
COPY . .

# 6. Next.js 애플리케이션 빌드
RUN npm run build


# 7. 프로덕션 환경 설정
FROM node:20-alpine

WORKDIR /app

# 8. 빌드된 파일만 복사
COPY --from=builder /app /app

# 9. 환경변수 설정 (옵션)
ENV NODE_ENV production

# 10. 포트 설정
EXPOSE 3000

# 11. Next.js 애플리케이션 실행
CMD ["npm", "start"]
