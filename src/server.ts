import App from '@root/app';
import validateEnv from '@utils/validateEnv';
import { AuthRoute } from '@routes/auth.route';
import { IndexRoute } from '@routes/index.route';
import { UsersRoute } from '@routes/users.route';
import { ProductsRoute } from '@routes/products.route';
import { VendingRoute } from '@routes/vending.route';

validateEnv();
// initialize routes
const app = new App([new IndexRoute(), new VendingRoute(), new AuthRoute(), new UsersRoute(), new ProductsRoute()]);

app.listen();
