package com.fastma.fastma.entity;

import java.util.Date;

public class Betorder {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column betorder.bet_orderid
     *
     * @mbggenerated
     */
    private Integer bet_orderid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column betorder.userid
     *
     * @mbggenerated
     */
    private Integer userid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column betorder.stake_token
     *
     * @mbggenerated
     */
    private Integer stake_token;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column betorder.racetrack_id
     *
     * @mbggenerated
     */
    private Integer racetrack_id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column betorder.time
     *
     * @mbggenerated
     */
    private Date time;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column betorder.iteration
     *
     * @mbggenerated
     */
    private Integer iteration;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column betorder.bet_orderid
     *
     * @return the value of betorder.bet_orderid
     *
     * @mbggenerated
     */
    public Integer getBet_orderid() {
        return bet_orderid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column betorder.bet_orderid
     *
     * @param bet_orderid the value for betorder.bet_orderid
     *
     * @mbggenerated
     */
    public void setBet_orderid(Integer bet_orderid) {
        this.bet_orderid = bet_orderid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column betorder.userid
     *
     * @return the value of betorder.userid
     *
     * @mbggenerated
     */
    public Integer getUserid() {
        return userid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column betorder.userid
     *
     * @param userid the value for betorder.userid
     *
     * @mbggenerated
     */
    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column betorder.stake_token
     *
     * @return the value of betorder.stake_token
     *
     * @mbggenerated
     */
    public Integer getStake_token() {
        return stake_token;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column betorder.stake_token
     *
     * @param stake_token the value for betorder.stake_token
     *
     * @mbggenerated
     */
    public void setStake_token(Integer stake_token) {
        this.stake_token = stake_token;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column betorder.racetrack_id
     *
     * @return the value of betorder.racetrack_id
     *
     * @mbggenerated
     */
    public Integer getRacetrack_id() {
        return racetrack_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column betorder.racetrack_id
     *
     * @param racetrack_id the value for betorder.racetrack_id
     *
     * @mbggenerated
     */
    public void setRacetrack_id(Integer racetrack_id) {
        this.racetrack_id = racetrack_id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column betorder.time
     *
     * @return the value of betorder.time
     *
     * @mbggenerated
     */
    public Date getTime() {
        return time;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column betorder.time
     *
     * @param time the value for betorder.time
     *
     * @mbggenerated
     */
    public void setTime(Date time) {
        this.time = time;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column betorder.iteration
     *
     * @return the value of betorder.iteration
     *
     * @mbggenerated
     */
    public Integer getIteration() {
        return iteration;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column betorder.iteration
     *
     * @param iteration the value for betorder.iteration
     *
     * @mbggenerated
     */
    public void setIteration(Integer iteration) {
        this.iteration = iteration;
    }
}