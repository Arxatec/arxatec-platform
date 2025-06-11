import { Switch, Route } from "wouter";
import * as publicPages from "~/modules/shared";
import * as laywerPages from "~/modules/laywer";
import * as guard from "~/components/guards";
import * as layout from "~/components/layouts";
import { ROUTES } from "./routes";

export default function Routes() {
  return (
    <Switch>
      {/* Start */}
      <Route path={ROUTES.Auth} nest>
        <guard.GuestGuard>
          {/* Authentication */}
          <Route
            path={ROUTES.AuthRoutes.VerifyAccount}
            component={publicPages.AccountVerificationPage}
          />
          <Route
            path={ROUTES.AuthRoutes.RecoverPassword}
            component={publicPages.ForgotPasswordPage}
          />
          <Route
            path={ROUTES.AuthRoutes.Login}
            component={publicPages.LoginPage}
          />
          <Route
            path={ROUTES.AuthRoutes.Register}
            component={publicPages.RegisterPage}
          />

          {/* Onboarding */}
          <Route
            path={ROUTES.AuthRoutes.OnboardingLawyer}
            component={publicPages.OnboardingLawyerPage}
          />
          <Route
            path={ROUTES.AuthRoutes.OnboardingCustomer}
            component={publicPages.OnboardingCustomerPage}
          />
          <Route
            path={ROUTES.AuthRoutes.OnboardingGeneral}
            component={publicPages.OnboardingGeneralPage}
          />
        </guard.GuestGuard>
      </Route>

      {/* Platform */}
      <Route path={ROUTES.App} nest>
        <guard.AuthGuard>
          <layout.Sidebar>
            {/* Abogado */}
            <Route
              path={ROUTES.AppRoutes.LawyerCasesPersonal}
              component={laywerPages.PersonalCasesPage}
            />
            <Route
              path={ROUTES.AppRoutes.LawyerCasesExplorer}
              component={laywerPages.ExplorerCasesPage}
            />
            <Route
              path={ROUTES.AppRoutes.LawyerCasesCreate}
              component={laywerPages.CreateCasePage}
            />
            <Route
              path={ROUTES.AppRoutes.LawyerCasesClients}
              component={laywerPages.ClientsPage}
            />
            <Route
              path={ROUTES.AppRoutes.LawyerCasesDetail}
              component={laywerPages.ViewCasePage}
            />
            <Route
              path={ROUTES.AppRoutes.LawyerCases}
              component={laywerPages.ViewCasesPage}
            />

            {/* Publico */}
            <Route
              path={ROUTES.AppRoutes.ArticlesCreate}
              component={publicPages.ArticleEditorPage}
            />
            <Route
              path={ROUTES.AppRoutes.ArticlesEdit}
              component={publicPages.ArticleEditorPage}
            />
            <Route
              path={ROUTES.AppRoutes.Articles}
              component={publicPages.ViewArticlesPage}
            />
          </layout.Sidebar>
        </guard.AuthGuard>
      </Route>

      {/* NotFound */}
      <Route path={ROUTES.NotFound}>
        <publicPages.NotFoundPage />
      </Route>
    </Switch>
  );
}
