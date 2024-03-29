import "@/App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import PageLayout from "@/components/PageLayout";
import IssuePage from "@/pages/IssuePage";
import TaskPage from "@/pages/TaskPage";
import ProfilePage from "@/pages/ProfilePage";
import FindIdForm from "@/components/auth/FindIdForm";
import LoginForm from "@/components/auth/LoginForm";
import FindIdLayout from "@/components/auth/FindIdLayout";
import FindIdSuccess from "@/components/auth/FindIdSuccess";
import FindPasswdLayout from "@/components/auth/FindPasswordLayout";
import FindPasswordForm from "@/components/auth/FindPasswordForm";
import FindPasswdSuccess from "@/components/auth/FindPasswordSuccess";
import SignupSuccess from "@/components/auth/SignupSuccess";
import SignupFormRequired from "@/components/auth/SignupFormRequired";
import SignupFormOptional from "@/components/auth/SignupFormOptional";
import ProjectPage from "./pages/ProjectPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "signup/required",
        element: <SignupFormRequired />,
      },
      {
        path: "signup/optional",
        element: <SignupFormOptional />,
      },
      {
        path: "signup/success",
        element: <SignupSuccess />,
      },
      {
        path: "find/id",
        element: <FindIdLayout />,
        children: [
          {
            index: true,
            element: <FindIdForm />,
          },
          {
            path: "success",
            element: <FindIdSuccess />,
          },
        ],
      },
      {
        path: "find/password",
        element: <FindPasswdLayout />,
        children: [
          {
            index: true,
            element: <FindPasswordForm />,
          },
          {
            path: "success",
            element: <FindPasswdSuccess />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <PageLayout /> ,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <IssuePage />,
      },
      {
        path: "/tasks",
        element: <TaskPage />,
      },
      {
        path: "/mypage",
        element: <ProfilePage />,
      },
      {
        path: "/project",
        element: <ProjectPage />,
      },
    ],
  },
]);

const App = () => {

  // const logged = useRecoilValue(loggedState);

  // 로그인 유무
  // useEffect(() => {
  //   logged ? router.navigate("/") : router.navigate("/auth/login");
  // }, [logged]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
