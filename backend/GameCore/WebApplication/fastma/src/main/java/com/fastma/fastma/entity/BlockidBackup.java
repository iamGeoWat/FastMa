package com.fastma.fastma.entity;

import java.util.Date;

public class BlockidBackup {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column blockid_backup.id
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column blockid_backup.blockid
     *
     * @mbggenerated
     */
    private String blockid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column blockid_backup.selected
     *
     * @mbggenerated
     */
    private Integer selected;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column blockid_backup.time
     *
     * @mbggenerated
     */
    private Date time;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column blockid_backup.id
     *
     * @return the value of blockid_backup.id
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column blockid_backup.id
     *
     * @param id the value for blockid_backup.id
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column blockid_backup.blockid
     *
     * @return the value of blockid_backup.blockid
     *
     * @mbggenerated
     */
    public String getBlockid() {
        return blockid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column blockid_backup.blockid
     *
     * @param blockid the value for blockid_backup.blockid
     *
     * @mbggenerated
     */
    public void setBlockid(String blockid) {
        this.blockid = blockid == null ? null : blockid.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column blockid_backup.selected
     *
     * @return the value of blockid_backup.selected
     *
     * @mbggenerated
     */
    public Integer getSelected() {
        return selected;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column blockid_backup.selected
     *
     * @param selected the value for blockid_backup.selected
     *
     * @mbggenerated
     */
    public void setSelected(Integer selected) {
        this.selected = selected;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column blockid_backup.time
     *
     * @return the value of blockid_backup.time
     *
     * @mbggenerated
     */
    public Date getTime() {
        return time;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column blockid_backup.time
     *
     * @param time the value for blockid_backup.time
     *
     * @mbggenerated
     */
    public void setTime(Date time) {
        this.time = time;
    }
}