package com.seproject.web.controller;

import com.seproject.common.RM;
import com.seproject.domain.Message;
import com.seproject.service.MainService;
import com.seproject.service.NewsService;
import com.seproject.web.parameter.GetMissionParameter;
import com.seproject.web.parameter.MessageParameter;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
public class MessageController {
    MainService mainService;
    NewsService newsService;
    @RequestMapping(value = "/message.html")
    @ResponseBody
    public ModelAndView messagePage(HttpServletRequest request){
        ModelAndView messageView = new ModelAndView("Message");
        String phoneNumber = request.getParameter("phoneNumber");
        messageView.addObject("phoneNumber",phoneNumber);
        return messageView;
    }
    @RequestMapping(value = "/SendMessage")
    @ResponseBody
    public String send(@RequestBody String messageParamter){
        JSONObject object=JSONObject.fromObject(messageParamter);
        MessageParameter para= (MessageParameter) JSONObject.toBean(object,MessageParameter.class);
        Message message=new Message();
        message.setKeyID(mainService.getCurrentTime()+" * "+para.getReceiverID());
        message.setSenderID(para.getSenderID());
        message.setReceiverID(para.getReceiverID());
        message.setType(para.getType());
        message.setContent(para.getContent());
        RM rm=newsService.sendMessage(message);
        return rm.toString();
    }
    @RequestMapping(value = "/DeleteMessage")
    @ResponseBody
    public String delete(@RequestBody String keyID){

        return newsService.deleteMessage(keyID).toString();
    }
    @RequestMapping(value = "/GetMessage")
    @ResponseBody
    public JSONArray get(@RequestBody String phoneNumber){
        System.out.println("!!!!!!!!!!!!!!!!!!!!!" + phoneNumber);
        //获取某个用户信箱中的全部信息
        String uid = phoneNumber.split(":")[1];
        uid = uid.substring(0,uid.length()-1);
        ArrayList<Message> messages=newsService.getAllMessages(uid);

        //return toJsonString(messages);
        return JSONArray.fromObject(messages);
    }


    public String toJsonString(Object o){
        JSONObject jsonObject = JSONObject.fromObject(o);
        String ret = jsonObject.toString();
        return ret;
    }
    @Autowired
    public void setMainService(MainService mainService){this.mainService=mainService;}
    @Autowired
    public void setNewsService(NewsService newsService){this.newsService=newsService;}
}

