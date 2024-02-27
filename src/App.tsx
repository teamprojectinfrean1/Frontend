import "@/App.css";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loggedState } from "@/stores/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import AuthPage from "@/pages/AuthPage";
import PageLayout from "@/components/PageLayout";
import IssuePage from "@/pages/IssuePage";
import TaskPage from "@/pages/TaskPage";
import ProfilePage from "@/pages/ProfilePage";
import FindEmailForm from "@/components/auth/FindEmailForm";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import FindEmailLayout from "@/components/auth/FindEmailLayout";
import FindEmailSuccess from "@/components/auth/FindEmailSuccess";
import FindPasswdLayout from "@/components/auth/FindPasswdLayout";
import FindPasswordForm from "@/components/auth/FindPasswdForm";
import FindPasswdSuccess from "@/components/auth/FindPasswdSuccess";
import SignupSuccess from "@/components/auth/SignupSuccess";

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
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "signup/success",
        element: <SignupSuccess />,
      },
      {
        path: "find/email",
        element: <FindEmailLayout />,
        children: [
          {
            index: true,
            element: <FindEmailForm />,
          },
          {
            path: "success",
            element: <FindEmailSuccess />,
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
    element: <PageLayout />,
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
