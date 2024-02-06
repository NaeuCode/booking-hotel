import { Toaster } from "react-hot-toast";
import Header from "../Components/Layout/Header";
import "./index.css";
import LocationList from "../Components/Index/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../Components/Layout/AppLayout";
import Hotels from "../Components/Hotel/Hotels";
import HotelsProvider from "../Components/Context/HotelsProvider";
import SingleHotel from "../Components/Hotel/SingleHotel";
import BookmarkLayout from "../Components/Layout/BookmarkLayout";
import BookmarkListProvider from "../Components/Context/BookmarkListContext";
import Bookmark from "../Components/Bookmark/Bookmark";
import SingleBookmark from "../Components/Bookmark/SingleBookmark";
import AddNewBookmark from "../Components/Bookmark/AddNewBookmark";
import ProtectedRoute from "../Components/Shared/ProtectedRoute";
import AuthProvider from "../Components/Context/AuthProvider";
import Login from "../Components/Login/Login";

function Index() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />

            <Route path="/login" element={<Login />} />

            <Route path="/hotels" element={<AppLayout />} >
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>

            <Route path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkLayout />
                </ProtectedRoute>
              }>
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>

          </Routes>
        </HotelsProvider >
      </BookmarkListProvider>
    </AuthProvider>
  )
}

export default Index;

