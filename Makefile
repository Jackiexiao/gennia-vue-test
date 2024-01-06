server_name=web_server

.PHONY: install
install:
	pnpm install
	pnpm install pm2 -g

.PHONY: install_in_china
install_in_china:
	pnpm config set registry https://registry.npmmirror.com/

.PHONY: deploy # change `client/.env.production` & `server/.env` to your own settings, for example, change gennia.io to gennia.cn
deploy:
	pnpm run build
	pm2 delete ${server_name} 2> /dev/null || true
	pm2 start pnpm --time --name "${server_name}" -- start --port 3000

.PHONY: restart
restart: # if you change prisma schema, run `pnpm dlx prisma migrate dev` first
	pnpm run build
	pm2 delete ${server_name} 2> /dev/null || true && cd client && pm2 start pnpm --time --name "${server_name}" -- start --port 3000

.PHONY: clean
clean: # 清除 nuxt 缓存
	npx nuxi cleanup