package com.fastma.fastma.dao;

import com.fastma.fastma.entity.Withdraw;
import com.fastma.fastma.entity.WithdrawExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface WithdrawMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int countByExample(WithdrawExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int deleteByExample(WithdrawExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer req_id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int insert(Withdraw record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int insertSelective(Withdraw record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    List<Withdraw> selectByExample(WithdrawExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    Withdraw selectByPrimaryKey(Integer req_id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") Withdraw record, @Param("example") WithdrawExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") Withdraw record, @Param("example") WithdrawExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(Withdraw record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table withdraw
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(Withdraw record);
}