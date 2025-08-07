import { Item } from "@radix-ui/react-accordion";

export const pariticipants = [
  { "email": "324103310026@gvpce.ac.in", "submitted": false },
  { "email": "325103310l12@gvpce.ac.in", "submitted": false },
  { "email": "324103310101@gvpce.ac.in", "submitted": false },
  { "email": "maheshkarna32@gmail.com", "submitted": false },
  { "email": "mokarakrishnasatya38@gmail.com", "submitted": false },
  { "email": "325103310L17@gvpce.qc.in", "submitted": false },
  { "email": "324103310210@gvpce.ac.in", "submitted": false },
  { "email": "324103310262@gvpce.ac.in", "submitted": false },
  { "email": "323103310190@gvpce.ac.in", "submitted": false },
  { "email": "323103310200@gvpce.ac.in", "submitted": false },
  { "email": "324103310L12@gvpce.ac.in", "submitted": false },
  { "email": "323103310160@gvpce.ac.in", "submitted": false },
  { "email": "323103382040@gvpce.ac.in", "submitted": false },
  { "email": "323103310089@gvpce.ac.in", "submitted": false },
  { "email": "324103310095@gvpce.ac.in", "submitted": false },
  { "email": "324103310097@gvpce.ac.in", "submitted": false },
  { "email": "323103310061@gvpce.ac.in", "submitted": false },
  { "email": "324103310L13@gvpce.ac.in", "submitted": false },
  { "email": "sameer.shaik.cm268@gmail.com", "submitted": false },
  { "email": "324103310033@gvpce.ac.in", "submitted": false },
  { "email": "yarrarapuvijay@gmail.com", "submitted": false },
  { "email": "324103310011@gvpce.ac.in", "submitted": false },
  { "email": "ayyappasai984@gmail.com", "submitted": false },
  { "email": "325103310l07@gvpce.ac.in", "submitted": false },
  { "email": "324103310120@gvpce.ac.in", "submitted": false },
  { "email": "sainarendrakolli2004@gmail.com", "submitted": false },
  { "email": "325103310L01@gvpce.ac.in", "submitted": false },
  { "email": "325103310l23@gvpce.ac.in", "submitted": false },
  { "email": "325103310l09@gvpce.ac.in", "submitted": false },
  { "email": "325103310L10@gvpce.ac.in", "submitted": false },
  { "email": "323103310051@gvpce.ac.in", "submitted": false },
  { "email": "kummarasettisandeepsamuel@gmail.com", "submitted": false },
  { "email": "325103310L13@gvpce.ac.in", "submitted": false },
  { "email": "323103382021@gvpce.ac.in", "submitted": false },
  { "email": "323103382063@gvpce.ac.in", "submitted": false },
  { "email": "323103382063@gvpce.ac.in", "submitted": false },
  { "email": "323103310011@gvpce.ac.in", "submitted": false }
];

export  function setSubmitted(mail){
  const pt = pariticipants.find(item => item.email === mail)
  pt.submitted = true
}

export function check(mail){
  return pariticipants.find(item => item.email === mail)?.submitted
}
