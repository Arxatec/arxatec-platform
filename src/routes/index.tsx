import { Switch, Route } from "wouter";
import { ROUTE_NAMES } from "./routes";
import * as pages from "~/modules";

export default function Routes() {
  return (
    <Switch>
      <Route
        path={`/${ROUTE_NAMES.VERIFY_ACCOUNT}`}
        component={pages.AccountVerificationPage}
      />
      <Route
        path={`/${ROUTE_NAMES.FORGOT_PASSWORD}`}
        component={pages.ForgotPasswordPage}
      />
      <Route path={`/${ROUTE_NAMES.LOGIN}`} component={pages.LoginPage} />
      <Route path={`/${ROUTE_NAMES.REGISTER}`} component={pages.RegisterPage} />

      <Route path={ROUTE_NAMES.ONBOARDING} nest>
        <Switch>
          <Route
            path={`/${ROUTE_NAMES.ONBOARDING_LAWYER}`}
            component={pages.OnboardingLawyerPage}
          />
          <Route
            path={`/${ROUTE_NAMES.ONBOARDING_CUSTOMER}`}
            component={pages.OnboardingCustomerPage}
          />
          <Route path="/" component={pages.OnboardingGeneralPage} />
        </Switch>
      </Route>

      <Route path="/" nest>
        <pages.Protected>
          <pages.Sidebar>
            {/* Communities section */}
            <Route path={ROUTE_NAMES.COMMUNITIES} nest>
              <Switch>
                <Route
                  path={`/${ROUTE_NAMES.CREATE_COMMUNITY}`}
                  component={pages.CreateCommunityPage}
                />
                <Route path={ROUTE_NAMES.POSTS} nest>
                  <Switch>
                    <Route
                      path={`/${ROUTE_NAMES.CREATE_POST}`}
                      component={pages.CreatePostPage}
                    />
                    <Route
                      path={`/${ROUTE_NAMES.POST}`}
                      component={pages.PostPage}
                    />
                    <Route path="/" component={pages.PostsPage} />
                  </Switch>
                </Route>
                <Route
                  path={`/${ROUTE_NAMES.COMMUNITY}`}
                  component={pages.CommunityPage}
                />
                <Route path="/" component={pages.CommunitiesPage} />
              </Switch>
            </Route>

            {/* Main sections */}
            <Route
              path={ROUTE_NAMES.DASHBOARD}
              component={pages.DashboardPage}
            />
            <Route path={ROUTE_NAMES.CALENDAR} component={pages.CalendarPage} />
            <Route path={ROUTE_NAMES.CHATS} component={pages.ChatsPage} />
            <Route
              path={ROUTE_NAMES.SETTINGS}
              component={pages.SettingsLawyerPage}
            />
            <Route
              path={ROUTE_NAMES.PROFILE}
              component={pages.ViewProfilePage}
            />
            <Route
              path={ROUTE_NAMES.LAWYERS}
              component={pages.ViewLawyersPage}
            />

            {/* Cases section */}
            <Route path={ROUTE_NAMES.CASES} nest>
              <Switch>
                <Route
                  path={`/${ROUTE_NAMES.PERSONAL_CASES}`}
                  component={pages.PersonalCasesPage}
                />
                <Route
                  path={`/${ROUTE_NAMES.EXPLORER_CASES}`}
                  component={pages.ExplorerCasesPage}
                />
                <Route
                  path={`/${ROUTE_NAMES.CREATE_CASE}`}
                  component={pages.CreateCasePage}
                />
                <Route
                  path={`/${ROUTE_NAMES.CLIENTS}`}
                  component={pages.ClientsPage}
                />
                <Route
                  path={`/${ROUTE_NAMES.CASE}`}
                  component={pages.ViewCasePage}
                />
                <Route path="/" component={pages.ViewCasesPage} />
              </Switch>
            </Route>

            {/* Articles section */}
            <Route path={ROUTE_NAMES.ARTICLES} nest>
              <Switch>
                <Route
                  path={`/${ROUTE_NAMES.CREATE_ARTICLE}`}
                  component={pages.ArticleEditorPage}
                />
                <Route path={`/${ROUTE_NAMES.EDIT_ARTICLE}`} nest>
                  <Switch>
                    <Route path="/:id" component={pages.ArticleEditorPage} />
                  </Switch>
                </Route>

                <Route path="/" component={pages.ViewArticlesPage} />
              </Switch>
            </Route>
          </pages.Sidebar>
        </pages.Protected>
      </Route>
      <Route component={pages.NotFoundPage} />
    </Switch>
  );
}
