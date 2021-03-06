/**
 * @authr fortune
 */
package com.seproject.web;

import com.seproject.domain.Mission;
import com.seproject.domain.User;
import com.seproject.service.Factory;
import com.seproject.service.MissionService;
import com.seproject.service.blService.BasicBLService;
import com.seproject.web.controller.MissionController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@RestController
public class MultiController {
    //private BasicBLService<User> basicBLService= Factory.getBasicBLService(new User());
    private BasicBLService<User> basicBLService= Factory.getUserBasicBLService();
    //private BasicBLService<Mission> missionBasicBLService=Factory.getBasicBLService(new Mission());
    private BasicBLService<Mission> missionBasicBLService=Factory.getMissionBasicBLService();
    private MissionService missionService;
    @RequestMapping(value = "/test1.html")
    public ModelAndView getTagPage(HttpServletRequest request){
        ModelAndView model;
        String phoneNumber = request.getParameter("phoneNumber");
        String sufixx="\'missionImages/";
        String url=sufixx+request.getParameter("collection")+"_";
        int index = Integer.parseInt(request.getParameter("imageURL"));

        String collection = request.getParameter("collection");
        System.out.println("phoneNumer:"+phoneNumber);
        System.out.println("collection:"+collection);
        ArrayList<Integer> submission = new MissionController().getPictureIndex(phoneNumber, collection);
        System.out.println("submission.size()="+submission.size());
        url += (submission.get(index)+1)+".jpg\'";
        int tagType = missionBasicBLService.findByKey(collection).getTagType();
        if(tagType == 1){
            model = new ModelAndView("LabelEdit");
            ArrayList<String> missionLabel = missionBasicBLService.findByKey(collection).getMissionLabel();
            System.out.println(missionLabel.get(0));
            String label = missionLabel.get(0);
            String labels[] = label.split(",");
            System.out.println(labels[0]);
            label = "";
            for(int i=0;i<labels.length-1;i++){
                label+=labels[i].substring(1, labels[i].length()-1)+",";
            }
            label+=labels[labels.length-1].substring(1, labels[labels.length-1].length()-1);
            label = "\'"+label+"\'";
            System.out.println(label);
            model.addObject("label", label);
            //model.addObject("imageURL", index+1);
        }else {
            model = new ModelAndView("SingleEdit");
        }
        model.addObject("url",url);
        model.addObject("collection","\'"+collection+"\'");
        //int picNum = missionBasicBLService.findByKey(collection).getFileNum();
        model.addObject("picNum", submission.size());
        User user = basicBLService.findByKey(phoneNumber);
        model.addObject("userCategory",user.getCategory());
        model.addObject("userName",user.getUserName());
        model.addObject("userPhone",phoneNumber);
        model.addObject("tagType", tagType);



        return model;
    }

    @RequestMapping(value = "/getCollectionInfo")
    @ResponseBody
    /**
     * 任务大厅加载所有任务
     */
    public String[] getCollectionInfo(@RequestBody String mi) {

        ArrayList<Mission> tmpMission=missionBasicBLService.getAllObjects();
        int index=0;
        String[] missionNames=new String[1000];
        if(tmpMission!=null&&tmpMission.size()>0) {
            for (Mission mission : tmpMission) {
                missionNames[index] = mission.getName() + "^" + mission.getDescription();
                index++;
            }
        }
        return missionNames;
    }

    @RequestMapping(value = "/getMissionDetails")
    @ResponseBody
    public ModelAndView getMissionDetails(HttpServletRequest request){
        String missionName=request.getParameter("missionName");
        Mission tmpMission=missionBasicBLService.findByKey(missionName);
        int picNum=tmpMission.getFileNum();
        double credit=tmpMission.getReward();
        String startTime=tmpMission.getStartTime();
        String endTime=tmpMission.getEndTime();
        String Level=tmpMission.getWorkerLevel();
        String description=tmpMission.getDescription();

        String picType = tmpMission.getPicType();
        int tagType = tmpMission.getTagType();
        int difficulty = tmpMission.getDifficulty();
        ArrayList<String> missionLabel = tmpMission.getMissionLabel();
        int maxWorkerNum = tmpMission.getMaxWorkerNum();
        int bonusStrategy = tmpMission.getBonusStrategy();
        int evaluateStrategy = tmpMission.getEvaluateStrategy();

        ModelAndView view= new ModelAndView("MissionDetails");
        view.addObject("missionName",missionName);
        view.addObject("picNum",picNum);
        view.addObject("credit",credit);
        view.addObject("startTime", startTime);
        view.addObject("endTime", endTime);
        view.addObject("Level",Level);
        view.addObject("description",description);

        view.addObject("picTye",picType);
        view.addObject("tagType",tagType);
        view.addObject("difficulty",difficulty);
        view.addObject("missionLabel",missionLabel);
        view.addObject("maxWorkerNum",maxWorkerNum);
        view.addObject("bonusStrategy",bonusStrategy);
        view.addObject("evaluateStrategy",evaluateStrategy);
        return view;
    }

    @RequestMapping(value = "/getSubmission")
    @ResponseBody
    public ModelAndView getSubMission(HttpServletRequest request){
        String mid = "\'"+request.getParameter("imageURL")+"\'";
        String uid = request.getParameter("userPhone");
        Mission mission = missionBasicBLService.findByKey(request.getParameter("imageURL"));

        int tagType = mission.getTagType();
        int picNum = mission.getFileNum();
        ModelAndView view = new ModelAndView("personalSubmission");
        view.addObject("mid", mid);
        view.addObject("uid", uid);
        view.addObject("tagType", tagType);
        view.addObject("picNum", picNum);

        return view;
    }
    @Autowired
    public void setMissionService(MissionService missionService){
        this.missionService=missionService;
    }
}
