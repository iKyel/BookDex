import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useUploadBookCoverMutation,
} from "../../../redux/api/bookApiSlice";

import { useFetchAuthorsQuery } from "../../../redux/api/authorApiSlice";
import { useFetchDemographicsQuery } from "../../../redux/api/demographicsApiSlice";
import { toast } from "react-toastify";

const BookUpdate = () => {
  return <div></div>;
};

export default BookUpdate;
