import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom";
import routes from "./routes";
import { renderToString } from "react-dom/server";

export async function render(url:string) {
	// 把路由配置routes交给静态路由处理器
	const handler = createStaticHandler(routes);

	// 上级服务器传进来的url的参数
	const request = new Request(`http://localhost:${url}`)

	// 返回两个类型 StaticHandlerContext | Response
	// StaticHandlerContext 正常返回
	// Response 非正常： 发生重定向 (经常在routes设置 loader / action 的时候出发)
	const context = await handler.query(request)
	if (context instanceof Response) {
		throw new Error(
			`SSR redirect: ${context.status} ${context.headers.get('location') ?? ''}`
		)
	}

	// 创建静态路由
	const router = createStaticRouter(handler.dataRoutes, context)
	
	// 渲染成HTML字符串
	const html = renderToString(
		<StaticRouterProvider router={router} context={context} />
	)

	return { html }
}