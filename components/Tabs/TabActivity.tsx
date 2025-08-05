import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import { z } from "zod";

// Define the schema for a single comment
const commentSchema = z.object({
  id: z.string(),
  user: z.object({
    name: z.string(),
    profile_image: z.string().optional(),
  }),
  created_at: z.string(),
  comment: z.string(),
  type: z.string(),
});

// Define the schema for activity which contains an array of comments
const activitySchema = z.object({
  comments: z.array(commentSchema),
});

// Define the schema for the success response which contains activity
const successSchema = z.object({
  activity: activitySchema.optional(),
});

// Define the schema for the overall response
const schema = z.object({
  success: successSchema,
});

// Infer the types from schemas
type Comment = z.infer<typeof commentSchema>;
type Activity = z.infer<typeof activitySchema>;
type SuccessResponse = z.infer<typeof successSchema>;

// Define the props type for TabActivity component
interface TabActivityProps {
  data: SuccessResponse;
}

const TabActivity: React.FC<TabActivityProps> = ({ data }: any) => {
  const [activity, setActivity] = useState<Comment[]>([]);

  // console.log(activity);

  useEffect(() => {
    let investorArray = []
    if (data.activity?.investors) {
       investorArray =  Object.values(data.activity?.investors)?.map((investor: any) => ({
        ...investor,
        type: "invested",
      })) || [];
    }
      let commentArray =[]
      if (data.activity?.comments) {
       commentArray =  Object.values(data.activity?.comments)?.map((comment: any) => ({
        ...comment,
        type: "commented",
      })) || [];
    }
    console.log("activity", investorArray, commentArray)
  
      // Combine both arrays
      let resultArray = [...investorArray, ...commentArray];
  
      // Sort the array in descending order of created_at
      resultArray.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setActivity(resultArray);
    
  }, [data]);

  return (
    <>
      {activity.length > 0 ? (
        activity.map((comment) => (
          <CommentItem key={comment.id} comment={comment} isTaged={true} />
        ))
      ) : (
        <p>No Activity available.</p>
      )}
    </>
  );
};

export default TabActivity;