import {
  // useAddTestimonialMutation,
  // useDeleteTestimonialMutation,
  // useEditTestimonialMutation,
  useGetTestimonialQuery,
} from "../api/testimonialApi";

export const addTestm = () =>{

}

export const useGetTestimonial = () =>{
  const { data:newData } = useGetTestimonialQuery();
  console.log(newData);
  // if(isError) {
    // return <ErrorIndicator error={error}/>
  // }

  // console.log(data);
  return newData.testimonial;
}

export const editTestm = () =>{
    
}

export const deleteTestm = () =>{
    
}