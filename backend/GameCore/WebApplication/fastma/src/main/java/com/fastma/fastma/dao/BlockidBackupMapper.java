package com.fastma.fastma.dao;

import com.fastma.fastma.entity.BlockidBackup;
import com.fastma.fastma.entity.BlockidBackupExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface BlockidBackupMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int countByExample(BlockidBackupExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int deleteByExample(BlockidBackupExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int insert(BlockidBackup record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int insertSelective(BlockidBackup record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    List<BlockidBackup> selectByExample(BlockidBackupExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    BlockidBackup selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") BlockidBackup record, @Param("example") BlockidBackupExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") BlockidBackup record, @Param("example") BlockidBackupExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(BlockidBackup record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table blockid_backup
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(BlockidBackup record);
}