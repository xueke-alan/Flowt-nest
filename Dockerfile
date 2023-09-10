FROM node:latest
# 创建目录
RUN mkdir -p /home/app/
# 指定工作目录
WORKDIR /home/app/
# 复制package.json文件
COPY ./dist/package.json ./
# 安装依赖
RUN npm install
# 复制编译好的项目文件
COPY ./dist .
# 复制配置文件
COPY ./.config ./.config/
# 创建log的目录卷
VOLUME [“/logs”]
# 暴露8000端口
EXPOSE 3000
# 程序启动命令
CMD ["node", "src/main.js"]